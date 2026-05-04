import React from 'react';
import { motion } from 'motion/react';
import { Twitter, Github, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t-2 border-zinc-800 relative z-10 bg-[#09090b] mt-24">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start">
          <span className="text-2xl font-black tracking-tighter text-white uppercase">
            Retrac<span className="text-zinc-500">Labs</span>
          </span>
          <span className="text-sm font-mono text-zinc-500 mt-2 font-bold">© {new Date().getFullYear()} / ALL RIGHTS RESERVED</span>
        </div>
        
        <div className="flex gap-4">
          {[
            { icon: Twitter, href: "#", color: "hover:bg-cyan-400 hover:text-black", border: "hover:border-cyan-400" },
            { icon: Github, href: "#", color: "hover:bg-white hover:text-black", border: "hover:border-white" },
            { icon: Mail, href: "mailto:hello@retraclabs.com", color: "hover:bg-yellow-400 hover:text-black", border: "hover:border-yellow-400" }
          ].map((social, i) => (
            <motion.a
              key={i}
              href={social.href}
              style={{ boxShadow: "0px 0px 0px 0px rgba(255,255,255,0)" }}
              whileHover={{ y: -4, boxShadow: "4px 4px 0px 0px rgba(255,255,255,0.2)" }}
              whileTap={{ y: 0, boxShadow: "0px 0px 0px 0px rgba(255,255,255,0.2)" }}
              className={`p-4 rounded-xl bg-zinc-900 border-2 border-zinc-800 text-zinc-400 transition-colors cursor-none ${social.color} ${social.border}`}
            >
              <social.icon className="w-6 h-6" />
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
};
