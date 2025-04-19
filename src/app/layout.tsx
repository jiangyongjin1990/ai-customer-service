import './globals.css'
import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import Navbar from '../components/Navbar'
// 移除Google字体导入
// import { Inter, Source_Code_Pro } from 'next/font/google'

// 使用系统字体变量
const fontClassSans = 'font-sans';
const fontClassMono = 'font-mono';

// 全局元数据
export const metadata: Metadata = {
  title: '维普特AI - 智能在线客服系统 | 提升用户体验与转化率',
  description: '维普特AI智能客服系统，利用自然语言处理和深度学习技术，为企业提供24/7全天候智能客户服务解决方案，快速响应客户需求，提高客户满意度。',
}

/**
 * @description 根布局组件
 * @param {React.ReactNode} children - 子组件
 * @returns {JSX.Element} 根布局组件
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // 分辨率检测与CSS变量调整的内联脚本
  const inlineScript = `
    (function() {
      function updateRootFontSize() {
        var width = window.innerWidth;
        var height = window.innerHeight;
        var scale = 1;
        
        // 高分辨率屏幕适配
        if (width >= 1920 && height >= 1080) {
          // 2K及以上分辨率
          if (width >= 2560 && height >= 1440) {
            scale = 1.2;
          } 
          // 1080p
          else {
            scale = 1.1;
          }
        }
        
        // 4K分辨率大尺寸屏幕
        if (width >= 3840 && height >= 2160) {
          scale = 1.4;
        }
        
        // 设置CSS变量
        document.documentElement.style.setProperty('--screen-scale', scale);
      }
      
      // 初始执行一次
      updateRootFontSize();
      
      // 监听窗口调整大小事件
      window.addEventListener('resize', updateRootFontSize);
    })();
  `;

  // 导航栏修复脚本
  const navbarFixScript = `
    // 在解析阶段立即开始尝试修复导航栏
    (function() {
      // 设置默认样式，立即应用
      var styleSheet = document.createElement('style');
      styleSheet.id = 'emergency-navbar-fix';
      styleSheet.innerHTML = \`
        body > nav:nth-of-type(n+2),
        body > header:nth-of-type(n+2),
        body nav ~ nav,
        body header ~ header,
        body [role="navigation"] ~ [role="navigation"],
        body [class*="navbar"]:nth-of-type(n+2),
        body [id*="navbar"]:nth-of-type(n+2) {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
        }
      \`;
      
      // 立即添加到head
      document.head.appendChild(styleSheet);
      
      // 预先定义一些紧急处理函数
      function hideExtraNavbars() {
        var navbars = document.querySelectorAll('nav, [role="navigation"], header, .navbar, #navbar, [class*="navbar"], [id*="navbar"]');
        if (navbars.length <= 1) return;
        
        // 使用一个计数器来追踪已处理的可见导航栏
        var visibleCount = 0;
        
        for (var i = 0; i < navbars.length; i++) {
          var nav = navbars[i];
          var style = window.getComputedStyle(nav);
          var rect = nav.getBoundingClientRect();
          var isVisible = style.display !== 'none' && 
                        style.visibility !== 'hidden' &&
                        parseFloat(style.opacity) > 0 &&
                        rect.height > 0;
          
          // 检查是否有导航链接或标识，确定它是导航栏
          var hasLinks = nav.querySelectorAll('a').length > 0;
          var hasLogo = nav.innerHTML.includes('维普特') || nav.innerHTML.includes('AI');
          var isLikelyNavbar = hasLinks || hasLogo;
          
          if (isVisible && isLikelyNavbar) {
            if (visibleCount === 0) {
              // 保留第一个可见的导航栏
              visibleCount++;
              nav.setAttribute('data-navbar-main', 'true');
              nav.id = nav.id || 'main-navbar';
              
              // 确保它可见
              nav.style.visibility = 'visible';
              nav.style.display = '';
              
              // 检查是否需要移动到固定容器
              var fixedContainer = document.getElementById('fixed-navbar-container');
              if (!fixedContainer) {
                fixedContainer = document.createElement('div');
                fixedContainer.id = 'fixed-navbar-container';
                fixedContainer.style.cssText = 'position: fixed !important; top: 0 !important; left: 0 !important; width: 100% !important; z-index: 10000 !important; transform: none !important;';
                document.body.parentNode.insertBefore(fixedContainer, document.body);
              }
              
              // 如果导航栏不在固定容器中，克隆并移动它
              if (nav.parentNode !== fixedContainer) {
                var clonedNav = nav.cloneNode(true);
                clonedNav.id = 'main-navbar';
                clonedNav.setAttribute('data-navbar-fixed', 'true');
                fixedContainer.innerHTML = '';
                fixedContainer.appendChild(clonedNav);
                
                // 隐藏原始导航栏
                nav.style.visibility = 'hidden';
                nav.style.opacity = '0';
                nav.style.pointerEvents = 'none';
                nav.classList.add('navbar-hidden');
              }
            } else {
              // 隐藏其他导航栏
              nav.style.display = 'none';
              nav.style.visibility = 'hidden';
              nav.style.opacity = '0';
              nav.style.pointerEvents = 'none';
              nav.classList.add('navbar-hidden');
            }
          }
        }
      }
      
      // 尝试在页面解析阶段就隐藏重复导航栏
      hideExtraNavbars();
      
      // 页面加载过程中多次检查
      ['DOMContentLoaded', 'load', 'pageshow'].forEach(function(event) {
        window.addEventListener(event, hideExtraNavbars, { once: false });
      });
      
      // 加载主修复工具
      if (document.readyState !== 'loading') {
        // 已经加载完成，立即执行
        loadMainFix();
      } else {
        // 等待DOM加载
        document.addEventListener('DOMContentLoaded', loadMainFix);
      }
      
      function loadMainFix() {
        // 动态加载修复工具
        var script = document.createElement('script');
        script.src = '/src/utils/navbarFix.js';
        script.type = 'module';
        script.onload = function() {
          // 如果加载成功，直接执行setupNavbarFix
          if (typeof window.setupNavbarFix === 'function') {
            window.setupNavbarFix();
          } else {
            // 尝试通过import加载
            import('/src/utils/navbarFix.js')
              .then(function(module) {
                module.setupNavbarFix();
                console.log('导航栏修复工具已加载');
              })
              .catch(function(error) {
                console.error('导航栏修复工具加载失败:', error);
                // 继续使用备用方法
                setInterval(hideExtraNavbars, 1000);
              });
          }
        };
        script.onerror = function() {
          console.error('导航栏修复工具加载失败');
          // 继续使用备用方法
          setInterval(hideExtraNavbars, 1000);
        };
        document.head.appendChild(script);
      }
      
      // 监听DOM变化
      if (typeof MutationObserver !== 'undefined') {
        var observer = new MutationObserver(function() {
          setTimeout(hideExtraNavbars, 100);
        });
        
        observer.observe(document.documentElement, {
          childList: true,
          subtree: true
        });
      }
      
      // 定期检查
      setInterval(hideExtraNavbars, 1000);
    })();
  `;
  
  // 预先隐藏重复导航栏的内联CSS
  const inlineCSS = `
    /* 预先隐藏除第一个外的所有导航栏元素，防止闪烁 */
    body > nav:not(:first-of-type),
    body > header:not(:first-of-type),
    body > div > nav:not(:first-of-type),
    body > div > header:not(:first-of-type),
    nav ~ nav,
    header ~ header,
    [role="navigation"] ~ [role="navigation"] {
      display: none !important;
      visibility: hidden !important;
      opacity: 0 !important;
    }
    
    /* 使用属性选择器预防闪烁 */
    [data-component="navbar"]:not(:first-of-type),
    [class*="navbar"]:not(:first-of-type),
    [id*="navbar"]:not(:first-of-type) {
      display: none !important;
      visibility: hidden !important;
      opacity: 0 !important;
    }
    
    /* 预处理样式，确保在JS加载前应用 */
    @media (prefers-reduced-motion: no-preference) {
      .preload-transitions * {
        transition-delay: 0.5s !important;
      }
    }
  `;

  // 移除加载类的脚本
  const removeJsLoadingScript = `
    // 在窗口加载完成后移除加载类
    window.addEventListener('load', function() {
      document.documentElement.classList.remove('js-loading');
      document.body.classList.remove('js-loading');
    });
  `;

  return (
    <html lang="zh-CN" className={`${fontClassSans} ${fontClassMono} preload-transitions js-loading`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script dangerouslySetInnerHTML={{ __html: inlineScript }} />
        <script dangerouslySetInnerHTML={{ __html: navbarFixScript }} />
        <meta name="theme-color" content="#ffffff" />
        {/* 添加用于消除页面底部空白的内联样式 */}
        <style dangerouslySetInnerHTML={{ __html: `
          html, body { 
            min-height: 100%; 
            margin: 0; 
            padding: 0; 
            overflow-x: hidden;
          }
          .main-app-container {
            min-height: calc(100vh - 70px);
            display: flex;
            flex-direction: column;
          }
          footer {
            margin-top: auto;
          }
        `}} />
      </head>
      <body className="antialiased flex flex-col">
        {/* 添加Navbar组件 */}
        <Navbar />

        {/* 内容容器 */}
        <div className="main-app-container flex-grow">
          {children}
        </div>

        {/* Toaster组件 */}
        <Toaster position="top-center" />
      </body>
    </html>
  )
}