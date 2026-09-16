import React from 'react';
import { motion } from 'motion/react';
import { Github, Mail } from 'lucide-react';
import JMCLogo from './JMCLogo';

export const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t-2 border-zinc-800 light:border-zinc-200 relative z-10 bg-[#09090b] light:bg-[#f4f4f5] mt-24">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start">
          <span className="text-2xl font-black tracking-tighter text-white light:text-zinc-900 uppercase">
            Retrac<span className="text-zinc-500 light:text-zinc-600">Labs</span>
          </span>
          <span className="text-sm font-mono text-zinc-500 light:text-zinc-600 mt-2 font-bold">© {new Date().getFullYear()} / ALL RIGHTS RESERVED</span>
        </div>

          <div className="flex flex-col items-center md:items-end gap-4">
              <div className="flex gap-4">
                  {[
                      { icon: JMCLogo, href: "https://jarredmcarter.com", color: "hover:bg-cyan-400 hover:text-black", border: "hover:border-cyan-400", label: "Jarred M. Carter" },
                      { icon: Github, href: "https://github.com/retraclabs", color: "hover:bg-white light:hover:bg-zinc-900 hover:text-black light:hover:text-white", border: "hover:border-white light:hover:border-zinc-900", label: "GitHub" },
                      { icon: Mail, href: "mailto:retrac.labs@gmail.com", color: "hover:bg-yellow-400 hover:text-black", border: "hover:border-yellow-400", label: "Email" }
                  ].map((social, i) => {
                      const Icon = social.icon;

                      return (
                          <motion.a
                              key={i}
                              href={social.href}
                              aria-label={social.label}
                              title={social.label}
                              style={{ boxShadow: "0px 0px 0px 0px rgba(255,255,255,0)" }}
                              whileHover={{ y: -4, boxShadow: "4px 4px 0px 0px rgba(255,255,255,0.2)" }}
                              whileTap={{ y: 0, boxShadow: "0px 0px 0px 0px rgba(255,255,255,0.2)" }}
                              className={`p-4 rounded-xl bg-zinc-900 light:bg-white border-2 border-zinc-800 light:border-zinc-200 text-zinc-400 light:text-zinc-600 transition-colors ${social.color} ${social.border}`}
                          >
                              <Icon className="w-6 h-6" />
                          </motion.a>
                      );
                  })}
              </div>

              <div className="flex items-center gap-4">
                  <a
                      href="#/about"
                      className="text-sm font-mono font-bold text-zinc-500 light:text-zinc-600 hover:text-white light:hover:text-zinc-900 transition-colors"
                  >
                      About
                  </a>
                  <span className="text-zinc-700 light:text-zinc-300" aria-hidden="true">/</span>
                  <a
                      href="#/early-access"
                      className="text-sm font-mono font-bold text-zinc-500 light:text-zinc-600 hover:text-white light:hover:text-zinc-900 transition-colors"
                  >
                      Become a Lab Rat
                  </a>
                  <span className="text-zinc-700 light:text-zinc-300" aria-hidden="true">/</span>
                  <a
                      href="#/privacy"
                      className="text-sm font-mono font-bold text-zinc-500 light:text-zinc-600 hover:text-white light:hover:text-zinc-900 transition-colors"
                  >
                      Privacy Policy
                  </a>
              </div>
          </div>

      </div>
    </footer>
  );
};
