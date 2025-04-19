with open('page.tsx', 'r') as f:
    content = f.readlines()

with open('page_new.tsx', 'w') as f:
    f.writelines(content[:449])
    f.write("""          </div>
        </div>
      </motion.section>

      {/* --- Customer Testimonials Section --- */}
      <TestimonialsSection />

      {/* --- Why Choose Us Section --- */}
""")
    f.writelines(content[590:])

print('文件已成功修改，保存为page_new.tsx') 