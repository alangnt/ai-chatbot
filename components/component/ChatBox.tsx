'use client'

import React, { useState } from 'react';

type Message = { role: 'human' | 'assistant'; content: string };

import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function ChatBox() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage: Message = { role: 'human', content: input };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: [...messages, newMessage] }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'assistant', content: data.reply },
      ]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <WebcamIcon className="h-6 w-6" />
          <span className="sr-only">AI Customer Service Chat</span>
        </Link>
      </header>
      
      <main className="flex-1 flex justify-center items-center px-4">
        <div className="bg-background shadow-lg rounded-2xl w-full max-w-md">
          <div className="flex flex-col h-full">
            <div className="bg-primary text-primary-foreground px-6 py-4 rounded-t-2xl">
              <h2 className="text-lg font-semibold">Chat with our AI</h2>
            </div>

            <div className="flex-1 p-6 flex flex-col">
              <div className="h-[400px] overflow-y-auto mb-4 scrollbar-hide">
                <div className="space-y-4">
                  {messages.map((msg, index) => (
                    <div key={index} className={`flex items-start gap-4 ${
                      msg.role === 'human' ? 'justify-end' : 'justify-start'
                    }`}>
                      {msg.role === 'assistant' && (
                        <div className="rounded-full w-10 h-10 bg-primary text-primary-foreground flex items-center justify-center">
                          <BotIcon className="h-6 w-6" />
                        </div>
                      )}
                      <div className={`rounded-lg p-4 max-w-[70%] ${
                        msg.role === 'human' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted text-foreground'
                      }`}>
                        <p>{msg.content}</p>
                      </div>
                      {msg.role === 'human' && (
                        <div className="rounded-full w-10 h-10 bg-primary text-primary-foreground flex items-center justify-center">
                          <UserIcon className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-muted px-6 py-4 rounded-b-2xl">
            <form onSubmit={handleSubmit} className='flex items-center gap-2'>
                <Input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className='flex-1'
                />
                <Button type="submit" className='hover:bg-gray-300 p-2 rounded-md'>Send</Button>
            </form>
            </div>
          </div>
        </div>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 AI Customer Service Chat. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy Policy
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Contact Us
          </Link>
        </nav>
      </footer>
    </div>
  )
}

function BotIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  )
}


function UserIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}


function WebcamIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="10" r="8" />
      <circle cx="12" cy="10" r="3" />
      <path d="M7 22h10" />
      <path d="M12 22v-4" />
    </svg>
  )
}
