import React from 'react';
import { motion } from 'framer-motion';

// 渐入动画变体
const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      staggerChildren: 0.2
    } 
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

// 客户证言数据
const testimonials = [
  {
    quote: "我们使用小嘉全渠道在线客服 8 年了，智能分配准确性高，能完全满足我们对渠道、地域的分配规则要求，功能一直在迭代，强大好用，我们信赖小嘉",
    product: "全渠道在线客服",
    company: "某大型电商平台",
    color: "glass-blue glass-card-transition"
  },
  {
    quote: "使用小嘉全渠道在线客服 2 年多了，在线流量可以自定义分配，效率很高，目前在用大模型获客机器人，效果不错，人机协同顺畅高效，能保证获线留资",
    product: "全渠道在线客服, 大模型获客机器人",
    company: "某教育培训机构",
    color: "glass-purple glass-card-transition"
  },
  {
    quote: "小嘉客服机器人现在是我们团队中不可或缺的部分，对于常见问答客服机器人可以完全独立接待，一些复杂情况人机协作也十分顺畅，帮助我们解放了部分人力，效率也大幅提升",
    product: "全渠道在线客服, 在线客服",
    company: "某金融服务公司",
    color: "glass-amber glass-card-transition"
  },
];

export default function TestimonialsSection() {
  return (
    <motion.section 
      className="py-14 md:py-20 bg-gradient-to-br from-blue-50 via-indigo-50/70 to-purple-50 relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      {/* 装饰背景元素 */}
      <div className="absolute top-0 left-0 w-full h-full opacity-40 overflow-hidden">
        <div className="bg-blob-1 top-0 right-0"></div>
        <div className="bg-blob-4 top-1/3 left-0"></div>
        <div className="bg-blob-2 bottom-0 right-1/4"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 md:mb-6"
          variants={itemVariants}
        >
          客户评价
        </motion.h2>
        
        <motion.p 
          className="text-gray-600 text-center mb-10 max-w-xl mx-auto"
          variants={itemVariants}
        >
          看看我们的客户如何评价小嘉 AI 客服系统
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index} 
              className={`p-6 rounded-xl shadow-sm hover:shadow-md border border-gray-100/30 ${testimonial.color}`}
              variants={itemVariants}
            >
              <div className="mb-4">
                {Array(5).fill(0).map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400 inline-block" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <blockquote className="text-gray-700 italic mb-6">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="mt-auto">
                <div className="text-xs text-gray-500">使用产品</div>
                <div className="text-sm font-medium text-gray-800 mt-1">{testimonial.product}</div>
                <div className="text-xs text-gray-500 mt-3">{testimonial.company}</div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* 分页指示器 */}
        <div className="mt-10 flex justify-center">
          <div className="flex space-x-3">
            {[0, 1, 2].map((_, i) => (
              <button 
                key={i} 
                className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${i === 0 ? 'bg-indigo-500 scale-110' : 'bg-gray-300 hover:bg-gray-400'}`}
                aria-label={`转到幻灯片 ${i + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
} 