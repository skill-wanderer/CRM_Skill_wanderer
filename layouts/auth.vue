<template>
  <div class="min-h-screen bg-[#0f0f0f] flex text-slate-200">
    <!-- Left Pane: Branding (Hidden on mobile) -->
    <div class="hidden lg:flex lg:w-1/2 bg-[#0f0f0f] relative items-center justify-center overflow-hidden">
      <!-- Decorative background elements -->
      <div class="absolute inset-0 bg-gradient-to-br from-[#ff6b2c]/10 via-[#0f0f0f] to-[#0f0f0f] z-0"></div>
      <div class="absolute -top-24 -left-24 w-[500px] h-[500px] rounded-full bg-[#ff6b2c]/20 blur-[120px] z-0 pointer-events-none"></div>
      <div class="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-[#0f0f0f] to-transparent z-0 pointer-events-none"></div>
      
      <div class="relative z-10 px-12 text-center max-w-lg">
        <h1 class="text-5xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-[#ff8c42] to-[#ff6b2c] bg-clip-text text-transparent drop-shadow-sm">
          Skill-Wanderer CRM
        </h1>
        <p class="text-lg text-slate-400 font-medium leading-relaxed">
          Streamline your guild operations, manage learning pathways, and track social impact.
        </p>
        
        <!-- UI Mockup Graphic (Abstract) -->
        <div class="mt-14 p-5 bg-[#1a1a1a]/60 rounded-2xl border border-white/5 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          <div class="flex gap-2.5 mb-6">
            <div class="w-3 h-3 rounded-full bg-[#ff6b2c] shadow-[0_0_10px_rgba(255,107,44,0.6)]"></div>
            <div class="w-3 h-3 rounded-full bg-[#ff8c42]"></div>
            <div class="w-3 h-3 rounded-full bg-white/20"></div>
          </div>
          <div class="space-y-4">
            <div class="h-4 bg-white/10 rounded-md w-3/4"></div>
            <div class="h-4 bg-white/5 rounded-md w-1/2"></div>
            <div class="h-4 bg-white/5 rounded-md w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Right Pane: Auth Forms -->
    <div class="flex-1 flex items-center justify-center p-6 sm:p-12 relative z-10">
      <!-- Ambient glow for right pane -->
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#ff6b2c]/5 via-[#0f0f0f] to-[#0f0f0f] -z-10 pointer-events-none"></div>

      <div class="w-full max-w-md">
        <!-- Mobile Logo -->
        <div class="lg:hidden text-center mb-10">
          <h2 class="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-[#ff8c42] to-[#ff6b2c] bg-clip-text text-transparent drop-shadow-sm">
            Skill-Wanderer CRM
          </h2>
        </div>
        
        <div class="bg-[#1a1a1a]/80 backdrop-blur-2xl p-8 sm:p-10 rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.6)] border border-white/5 relative overflow-hidden">
          <!-- Subtle top highlight for the card -->
          <div class="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#ff6b2c]/50 to-transparent"></div>
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
