      <motion.section 
        className="py-16 md:py-20 bg-gradient-to-b from-white via-indigo-50/20 to-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4">
          {/* 简化版本 - 无卡片内容 */}
        </div>
      </motion.section>

      {/* 注意：不要包含TestimonialsSection，原代码已有 */} 