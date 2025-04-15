import React from 'react';
// import { motion } from 'framer-motion'; // Comment out

// 简化动画变体
// const sectionVariants = { // Comment out
//   hidden: { opacity: 0 },
//   visible: { 
//     opacity: 1, 
//     transition: { duration: 0.4 }
//   }
// };

// const itemVariants = { // Comment out
//   hidden: { opacity: 0 },
//   visible: { 
//     opacity: 1,
//     transition: { duration: 0.3 }
//   }
// };

// 客户证言数据
const testimonials = [
  {
    quote: "我们使用小嘉全渠道在线客服 8 年了，智能分配准确性高，能完全满足我们对渠道、地域的分配规则要求，功能一直在迭代，强大好用，我们信赖小嘉",
    product: "全渠道在线客服",
    company: "某大型电商平台",
    color: "glass-blue"
  },
  {
    quote: "使用小嘉全渠道在线客服 2 年多了，在线流量可以自定义分配，效率很高，目前在用大模型获客机器人，效果不错，人机协同顺畅高效，能保证获线留资",
    product: "全渠道在线客服, 大模型获客机器人",
    company: "某教育培训机构",
    color: "glass-purple"
  },
  {
    quote: "小嘉客服机器人现在是我们团队中不可或缺的部分，对于常见问答客服机器人可以完全独立接待，一些复杂情况人机协作也十分顺畅，帮助我们解放了部分人力，效率也大幅提升",
    product: "全渠道在线客服, 在线客服",
    company: "某金融服务公司",
    color: "glass-amber"
  },
];

export default function TestimonialsSection() {
  return (
    <section 
      className="py-14 md:py-20 bg-gradient-to-br from-blue-50 via-indigo-50/70 to-purple-50 relative overflow-hidden"
    >
      {/* 移除装饰背景元素 */}
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 md:mb-6"
        >
          客户评价
        </h2>
        
        <p 
          className="text-gray-600 text-center mb-10 max-w-xl mx-auto"
        >
          看看我们的客户如何评价小嘉 AI 客服系统
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className={`p-6 rounded-xl shadow-sm hover:shadow-md border border-gray-100/30 ${testimonial.color}`}
            >
              <div className="mb-4">
                {Array(5).fill(0).map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400 inline-block" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <blockquote className="text-gray-700 italic mb-6">
                &quot;{testimonial.quote}&quot;
              </blockquote>
              
              <div className="mt-auto">
                <div className="text-xs text-gray-500">使用产品</div>
                <div className="text-sm font-medium text-gray-800 mt-1">{testimonial.product}</div>
                <div className="text-xs text-gray-500 mt-3">{testimonial.company}</div>
              </div>
            </div>
          ))}
        </div>
        
        {/* 移除分页指示器 */}
      </div>
    </section>
  );
} 
 