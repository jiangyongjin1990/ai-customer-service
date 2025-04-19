/**
 * @file 导航栏重影修复工具
 * @description 用于解决屏幕适配过程中导航栏可能出现的重影问题和布局错乱
 */

/**
 * 修复导航栏重影问题
 * @returns {void}
 */
export function fixNavbars() {
  // 获取所有可能的导航栏元素 - 使用更广泛的选择器
  const navbars = document.querySelectorAll(
    'nav, [role="navigation"], header, .navbar, #navbar, .nav-container, .header, #main-navbar, [class*="navbar"], [id*="navbar"], [class*="nav-"], [id*="nav-"], div[class*="header"], header'
  );
  
  if (navbars.length <= 1) {
    return; // 如果只有一个导航栏，不需要修复
  }
  
  console.log('发现多个导航元素，修复重影问题', navbars.length);
  
  // 记录第一个可见的导航栏
  let visibleNavFound = false;
  let mainNavbar = null;
  
  // 首先检查是否存在固定容器中的导航栏
  const fixedContainer = document.getElementById('fixed-navbar-container');
  if (fixedContainer) {
    const fixedNavbar = fixedContainer.querySelector('[id="main-navbar"]');
    if (fixedNavbar) {
      mainNavbar = fixedNavbar;
      visibleNavFound = true;
      console.log('使用固定容器中的导航栏');
    }
  }
  
  // 标记所有导航栏
  navbars.forEach((nav, idx) => {
    // 添加调试类名
    nav.classList.add('nav-debug-' + idx);
  });
  
  // 遍历所有导航元素
  navbars.forEach((nav, idx) => {
    // 检查元素是否可见并有内容
    const style = window.getComputedStyle(nav);
    const rect = nav.getBoundingClientRect();
    const isVisible = style.display !== 'none' && 
                    style.visibility !== 'hidden' && 
                    parseFloat(style.opacity) > 0 &&
                    rect.height > 0 &&
                    rect.width > 0;
    
    // 检查是否包含关键导航内容
    const hasLinks = nav.querySelectorAll('a').length > 0;
    const hasLogo = nav.innerHTML.includes('维普特') || nav.innerHTML.includes('AI');
    const isLikelyNavbar = hasLinks || hasLogo;
    
    if (isVisible && isLikelyNavbar) {
      if (!visibleNavFound) {
        // 保留第一个可见的导航栏
        visibleNavFound = true;
        mainNavbar = nav;
        // 确保该导航栏可见
        nav.style.visibility = 'visible';
        nav.style.display = '';
        nav.id = 'main-navbar';
        nav.setAttribute('data-navbar-fixed', 'true');
        console.log('保留导航栏:', idx);
      } else {
        // 强制隐藏其他可见的导航栏
        nav.style.display = 'none !important';
        nav.style.visibility = 'hidden !important';
        nav.style.opacity = '0 !important';
        nav.style.pointerEvents = 'none !important';
        nav.style.position = 'absolute !important';
        nav.style.zIndex = '-1 !important';
        nav.style.height = '0 !important';
        nav.style.overflow = 'hidden !important';
        nav.setAttribute('aria-hidden', 'true');
        nav.classList.add('navbar-hidden');
        console.log('隐藏重复导航栏:', idx);
      }
    }
  });
  
  // 确保主导航栏正确定位并不受缩放影响
  if (mainNavbar) {
    ensureNavbarPosition(mainNavbar);
  } else if (navbars.length > 0) {
    // 如果没有找到合适的导航栏，使用第一个
    console.warn('未找到合适的导航栏，使用第一个元素');
    ensureNavbarPosition(navbars[0]);
  }
  
  // 应用强制CSS样式
  applyCSSFixes();
}

/**
 * 应用CSS修复，强制隐藏重复导航栏
 */
function applyCSSFixes() {
  // 检查是否已存在样式元素
  let styleEl = document.getElementById('navbar-fix-styles');
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = 'navbar-fix-styles';
    document.head.appendChild(styleEl);
  }
  
  // 添加强制CSS规则
  styleEl.textContent = `
    /* 强制隐藏所有标记为隐藏的导航栏 */
    .navbar-hidden {
      display: none !important;
      visibility: hidden !important;
      opacity: 0 !important;
      pointer-events: none !important;
      position: absolute !important;
      z-index: -1 !important;
      height: 0 !important;
      width: 0 !important;
      overflow: hidden !important;
      clip: rect(0, 0, 0, 0) !important;
      margin: -1px !important;
      padding: 0 !important;
      border: 0 !important;
    }
    
    /* 确保主导航栏可见 */
    #main-navbar,
    [data-navbar-fixed="true"] {
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
      pointer-events: auto !important;
    }
    
    /* 确保固定容器可见且不受缩放影响 */
    #fixed-navbar-container {
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      z-index: 10000 !important;
      transform: none !important;
      pointer-events: auto !important;
      height: auto !important;
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
    }
  `;
}

/**
 * 确保导航栏位置正确，不受页面缩放影响
 * @param {HTMLElement} navbar - 导航栏元素
 */
function ensureNavbarPosition(navbar) {
  // 确保导航栏样式正确
  navbar.style.position = 'fixed';
  navbar.style.top = '0';
  navbar.style.left = '0';
  navbar.style.width = '100%';
  navbar.style.zIndex = '10000';
  navbar.style.transform = 'none';
  navbar.id = 'main-navbar';
  
  // 监听滚动事件，动态调整导航栏样式
  const handleScroll = () => {
    const scrollTop = window.pageYOffset;
    if (scrollTop > 10) {
      navbar.classList.add('navbar-scrolled');
      navbar.classList.remove('navbar-initial');
    } else {
      navbar.classList.add('navbar-initial');
      navbar.classList.remove('navbar-scrolled');
    }
  };
  
  // 立即执行一次
  handleScroll();
}

/**
 * 设置导航栏修复功能
 * @returns {void}
 */
export function setupNavbarFix() {
  // 创建固定容器用于放置导航栏
  const createFixedContainer = () => {
    let container = document.getElementById('fixed-navbar-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'fixed-navbar-container';
      container.style.cssText = `
        position: fixed !important; 
        top: 0 !important; 
        left: 0 !important; 
        width: 100% !important; 
        z-index: 10000 !important; 
        transform: none !important; 
        pointer-events: auto !important; 
        height: auto !important;
      `;
      
      // 添加到body前，确保不受缩放影响
      document.body.parentNode.insertBefore(container, document.body);
    }
    return container;
  };
  
  // 移动导航栏到固定容器
  const moveNavbarToFixedContainer = () => {
    const fixedContainer = createFixedContainer();
    
    // 使用更宽泛的选择器查找导航栏
    const navbar = document.querySelector('nav, .navbar, #navbar, [role="navigation"], header, [class*="navbar"], div[class*="header"]');
    
    if (navbar && navbar.parentNode !== fixedContainer) {
      // 克隆导航栏并移动到固定容器
      const clonedNavbar = navbar.cloneNode(true);
      clonedNavbar.id = 'main-navbar';
      clonedNavbar.setAttribute('data-navbar-fixed', 'true');
      fixedContainer.innerHTML = ''; // 清空容器
      fixedContainer.appendChild(clonedNavbar);
      
      // 隐藏原始导航栏
      navbar.style.visibility = 'hidden';
      navbar.style.pointerEvents = 'none';
      navbar.style.position = 'absolute';
      navbar.style.zIndex = '-1';
      navbar.classList.add('navbar-hidden');
      
      // 确保克隆的导航栏使用正确的样式
      ensureNavbarPosition(clonedNavbar);
      
      // 处理点击事件
      setupNavbarEventHandlers(clonedNavbar);
      
      console.log('成功移动导航栏到固定容器');
    } else {
      console.warn('未找到导航栏或导航栏已在固定容器中');
    }
  };
  
  // 设置导航栏事件处理
  const setupNavbarEventHandlers = (navbar) => {
    // 处理链接点击
    navbar.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href) {
          if (href.startsWith('/') || href.startsWith('#')) {
            // 内部链接
            window.location.href = href;
          } else {
            // 外部链接，使用默认行为
            return;
          }
          e.preventDefault();
        }
      });
    });
    
    // 处理按钮点击
    navbar.querySelectorAll('button').forEach(button => {
      const originalButton = document.querySelector(`button[class="${button.className}"]`);
      if (originalButton) {
        button.addEventListener('click', (e) => {
          originalButton.click();
          e.preventDefault();
        });
      }
    });
  };
  
  // 立即执行修复
  const runFix = () => {
    moveNavbarToFixedContainer();
    fixNavbars();
    applyCSSFixes();
  };
  
  // 页面加载完成后执行修复
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(runFix, 100);
  } else {
    window.addEventListener('load', () => {
      setTimeout(runFix, 100);
    });
  }
  
  // 监听DOM变化
  const observer = new MutationObserver(() => {
    setTimeout(fixNavbars, 100);
  });
  
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
  
  // 监听滚动事件
  window.addEventListener('scroll', function() {
    fixNavbars();
  }, { passive: true });
  
  // 监听页面尺寸变化
  window.addEventListener('resize', function() {
    moveNavbarToFixedContainer();
    fixNavbars();
  }, { passive: true });
  
  // 定期检查
  setInterval(fixNavbars, 1000);
  
  // 处理单页应用路由变化后的情况
  window.addEventListener('popstate', () => {
    setTimeout(() => {
      moveNavbarToFixedContainer();
      fixNavbars();
    }, 300);
  });
  
  // 如果存在相关方法，监听路由变化
  if (typeof window.history.pushState === 'function') {
    const originalPushState = window.history.pushState;
    window.history.pushState = function() {
      originalPushState.apply(this, arguments);
      setTimeout(() => {
        moveNavbarToFixedContainer();
        fixNavbars();
      }, 300);
    };
  }
}

// 导出默认函数，方便导入
export default setupNavbarFix; 