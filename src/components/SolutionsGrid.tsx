import React from 'react';

/**
 * @description 解决方案网格组件
 * @returns {JSX.Element} 解决方案网格组件
 */
const SolutionsGrid: React.FC = () => {
  const solutions = [
    {
      title: '电子商务',
      description: '实时处理订单查询、产品推荐、退款处理等客户咨询，提升转化率和客户满意度。',
      icon: '🛒',
      gradient: 'from-blue-500 to-indigo-600',
    },
    {
      title: '金融服务',
      description: '安全处理账户查询、交易帮助和产品咨询，同时确保数据安全和合规。',
      icon: '💰',
      gradient: 'from-purple-500 to-pink-600',
    },
    {
      title: '教育培训',
      description: '为学生提供24/7课程支持、学习资源推荐和常见问题解答。',
      icon: '🎓',
      gradient: 'from-green-500 to-teal-600',
    },
    {
      title: '医疗健康',
      description: '提供初步健康咨询、预约管理和医疗资源推荐，提升患者体验。',
      icon: '⚕️',
      gradient: 'from-red-500 to-orange-600',
    },
    {
      title: '旅游酒店',
      description: '处理预订查询、提供旅游建议和解决入住问题，优化客户旅行体验。',
      icon: '✈️',
      gradient: 'from-cyan-500 to-blue-600',
    },
    {
      title: '技术支持',
      description: '解决产品使用问题、提供故障排除指南和软件更新支持。',
      icon: '🔧',
      gradient: 'from-slate-500 to-gray-600',
    },
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {solutions.map((solution, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100"
        >
          <div className={`relative h-48 w-full bg-gradient-to-r ${solution.gradient}`}>
            <div className="absolute top-4 left-4 bg-white/90 rounded-full p-3 z-20 shadow-md">
              <span className="text-3xl">{solution.icon}</span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 py-2 px-4 bg-white/80 backdrop-blur-sm rounded-lg">
              <h3 className="text-xl font-bold text-gray-900">{solution.title}</h3>
            </div>
          </div>
          <div className="p-6">
            <p className="text-gray-600">{solution.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SolutionsGrid; 