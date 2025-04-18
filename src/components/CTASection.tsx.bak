import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

/**
 * CTA部分组件，显示主标题、副标题和行动按钮
 */
const CTASection = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-white to-gray-50">
      {/* 背景装饰元素 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[40%] -right-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 blur-3xl opacity-70"></div>
        <div className="absolute -bottom-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-r from-indigo-50 to-blue-50 blur-3xl opacity-70"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-500 to-cyan-500 animate-wave-text text-transparent bg-clip-text"
          >
            拥抱维普特，拥抱 AI
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-xl md:text-2xl text-gray-600 mb-10"
          >
            90% 以上的决策者希望引入 AI Agent 解决方案
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link href="/contact" className="water-ripple px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-300">
              预约演示
            </Link>
            <Link href="/test" className="water-ripple px-8 py-4 bg-white hover:bg-gray-100 text-indigo-600 font-medium rounded-lg border border-indigo-200 transition-colors duration-300">
              免费试用
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection; 