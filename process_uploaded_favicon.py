import os
import sys
import base64
from io import BytesIO
from PIL import Image

input_path = "C:\\Users\\KIIT0001\\.gemini\\antigravity\\brain\\14149156-bd83-4240-9e97-eae818584b96\\media__1778420597266.png"
output_dir = "c:\\Users\\KIIT0001\\CRM\\crm-modified\\CRMS-Frontend\\public"

def trim_and_transparent(im):
    if im.mode != 'RGBA':
        im = im.convert('RGBA')
    
    data = im.getdata()
    new_data = []
    
    left, top, right, bottom = im.width, im.height, 0, 0
    x, y = 0, 0
    
    for r, g, b, a in data:
        min_val = min(r, g, b)
        
        # Calculate new alpha
        new_a = a
        if min_val > 240 and r > 200 and g > 200 and b > 200:
            new_a = 0
        elif 80 <= min_val <= 240 and r > 80 and g > 80 and b > 80 and abs(r-g) < 30 and abs(g-b) < 30:
            # This is a grayscale anti-aliased pixel
            new_a = int(a * max(0, (240 - min_val)) / 160.0)
            
        if new_a == 0:
            new_data.append((0, 0, 0, 0))
        else:
            # If it's a partially transparent edge pixel, tint it towards dark gray to avoid white halo
            out_r, out_g, out_b = r, g, b
            if new_a < 255 and abs(r-g) < 30 and abs(g-b) < 30:
                out_r, out_g, out_b = 40, 40, 40
                
            new_data.append((out_r, out_g, out_b, new_a))
            if x < left: left = x
            if x > right: right = x
            if y < top: top = y
            if y > bottom: bottom = y
            
        x += 1
        if x >= im.width:
            x = 0
            y += 1
            
    im.putdata(new_data)
    
    if left > right or top > bottom:
        return im
        
    # Crop to the tight bounding box
    cropped = im.crop((left, top, right + 1, bottom + 1))
    
    # Make square without adding any padding or background color (keep it perfectly transparent)
    w, h = cropped.size
    size = max(w, h)
    
    square_bg = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    offset = ((size - w) // 2, (size - h) // 2)
    square_bg.paste(cropped, offset, cropped)
    
    return square_bg

try:
    img = Image.open(input_path)
    cropped_img = trim_and_transparent(img)
    
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        
    sizes_to_save = [16, 32, 48, 64, 180, 256, 512]
    
    for size in sizes_to_save:
        resized = cropped_img.resize((size, size), Image.Resampling.LANCZOS)
        
        if size == 32:
            resized.save(os.path.join(output_dir, "favicon-32x32.png"))
        if size == 180:
            resized.save(os.path.join(output_dir, "apple-touch-icon.png"))
            
        resized.save(os.path.join(output_dir, f"favicon-{size}x{size}.png"))
        
    # Create favicon.ico
    ico_sizes = [(16, 16), (32, 32), (48, 48), (64, 64), (256, 256)]
    cropped_img.save(os.path.join(output_dir, "favicon.ico"), format='ICO', sizes=ico_sizes)
    
    # Create favicon.svg
    svg_img = cropped_img.resize((512, 512), Image.Resampling.LANCZOS)
    buffered = BytesIO()
    svg_img.save(buffered, format="PNG")
    img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
    
    svg_content = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <image width="512" height="512" href="data:image/png;base64,{img_str}"/>
</svg>"""
    
    with open(os.path.join(output_dir, "favicon.svg"), "w") as f:
        f.write(svg_content)
        
    print("Successfully processed the uploaded image, removed white corners, and generated transparent favicon assets.")
except Exception as e:
    print(f"Error: {e}")
