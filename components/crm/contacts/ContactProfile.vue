<script setup lang="ts">
import { ref } from 'vue';
import { useContactsStore } from '~/stores/contacts';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  ChatBubbleLeftRightIcon
} from '@heroicons/vue/24/outline';

const contactsStore = useContactsStore();
const activeTab = ref('Activity');

const tabs = ['Activity', 'Notes', 'Emails', 'Meetings'];
</script>

<template>
  <div class="flex-1 flex flex-col h-full bg-white overflow-hidden relative">
    
    <!-- Empty State -->
    <div v-if="!contactsStore.selectedContact" class="flex-1 flex flex-col items-center justify-center p-8 text-center">
      <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
        <svg class="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </div>
      <h3 class="text-lg font-medium text-slate-900">No contact selected</h3>
      <p class="mt-1 text-sm text-slate-500">Select a contact from the list to view their profile.</p>
    </div>

    <!-- Profile View -->
    <template v-else>
      <!-- Header Section -->
      <div class="px-10 py-10 border-b border-slate-200 bg-white relative">
        <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div class="flex items-center gap-x-8">
            <!-- Avatar -->
            <div class="h-28 w-28 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden border-4 border-white shadow-md ring-1 ring-slate-200 flex-shrink-0">
              <img v-if="contactsStore.selectedContact.avatarUrl" :src="contactsStore.selectedContact.avatarUrl" :alt="contactsStore.selectedContact.firstName" class="h-full w-full object-cover" />
              <span v-else class="text-indigo-600 font-bold text-4xl">
                {{ contactsStore.selectedContact.firstName.charAt(0) }}{{ contactsStore.selectedContact.lastName.charAt(0) }}
              </span>
            </div>
            
            <!-- Name & Designation -->
            <div class="pt-2">
              <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {{ contactsStore.selectedContact.firstName }} {{ contactsStore.selectedContact.lastName }}
              </h1>
              <div class="mt-2 flex items-center text-base sm:text-lg text-slate-600">
                <span class="font-medium">{{ contactsStore.getContactField(contactsStore.selectedContact, 'jobTitle') }}</span>
                <span class="mx-3 text-slate-300">|</span>
                <span class="text-indigo-600 font-semibold cursor-pointer hover:underline">{{ contactsStore.getContactField(contactsStore.selectedContact, 'company') }}</span>
              </div>
            </div>
          </div>
          
        </div>

        <!-- Horizontal Action Toolbar -->
        <div class="mt-8 flex flex-wrap items-center gap-3">
          <button class="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 hover:shadow transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            <EnvelopeIcon class="h-5 w-5" />
            Email
          </button>
          <button class="inline-flex items-center gap-2 rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 hover:text-indigo-600 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            <PhoneIcon class="h-5 w-5 text-slate-400 group-hover:text-indigo-600" />
            Call
          </button>
          <button class="inline-flex items-center gap-2 rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 hover:text-indigo-600 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            <ChatBubbleLeftRightIcon class="h-5 w-5 text-slate-400" />
            Message
          </button>
          <button class="inline-flex items-center gap-2 rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-[#0A66C2] hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-[#0A66C2] focus:ring-offset-2 group">
            <svg class="h-5 w-5 text-slate-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fill-rule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clip-rule="evenodd" />
            </svg>
            LinkedIn
          </button>
        </div>
      </div>

      <!-- Tabs -->
      <div class="border-b border-slate-200 px-8">
        <nav class="-mb-px flex space-x-8" aria-label="Tabs">
          <button 
            v-for="tab in tabs" 
            :key="tab"
            @click="activeTab = tab"
            :class="[
              activeTab === tab 
                ? 'border-indigo-500 text-indigo-600' 
                : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700',
              'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium transition-colors'
            ]"
          >
            {{ tab }}
          </button>
        </nav>
      </div>

      <!-- Main Scrollable Area -->
      <div class="flex-1 overflow-y-auto bg-slate-50 p-8">
        <!-- Mock Content based on tab -->
        <div v-if="activeTab === 'Activity'" class="space-y-6">
          <h3 class="text-base font-semibold leading-6 text-slate-900">Recent Activity</h3>
          
          <!-- Mock Timeline Item -->
          <div class="relative pb-8">
            <span class="absolute left-4 top-4 -ml-px h-full w-0.5 bg-slate-200" aria-hidden="true"></span>
            <div class="relative flex space-x-3">
              <div>
                <span class="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center ring-8 ring-slate-50">
                  <EnvelopeIcon class="h-4 w-4 text-blue-500" aria-hidden="true" />
                </span>
              </div>
              <div class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                <div>
                  <p class="text-sm text-slate-500">Sent an email regarding <span class="font-medium text-slate-900">Q3 Partnership</span></p>
                </div>
                <div class="whitespace-nowrap text-right text-sm text-slate-500">
                  <time datetime="2026-05-05">1h ago</time>
                </div>
              </div>
            </div>
          </div>

        </div>
        
        <div v-else class="text-center py-12">
          <p class="text-slate-500 text-sm">Content for {{ activeTab }} will appear here.</p>
        </div>

      </div>
    </template>
  </div>
</template>
