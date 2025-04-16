'use client';

import { animate } from 'framer-motion';
import { useRef, useEffect } from 'react';
import React from 'react';

/**
 * @interface AnimatedNumberProps
 * @description AnimatedNumber组件的属性接口
 * @property {number} targetNumber - 要动画到的目标数字
 * @property {number} [duration=1.5] - 动画持续时间（秒）
 * @property {string} [className] - 容器的自定义类名
 * @property {React.ReactNode} [suffixElement] - 数字后显示的后缀元素
 */
interface AnimatedNumberProps {
    targetNumber: number;
    duration?: number;
    className?: string;
    suffixElement?: React.ReactNode;
}

/**
 * @function AnimatedNumber
 * @description 一个在视图中可见时展示数字增长动画的组件
 * @param {AnimatedNumberProps} props - 组件属性
 * @returns {React.ReactElement} 渲染的数字动画组件
 */
const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
    targetNumber,
    duration = 1.5, // 默认1.5秒
    className,
    suffixElement,
}) => {
    const numberRef = useRef<HTMLSpanElement>(null);
    const hasAnimated = useRef(false); // 跟踪动画是否已运行
    const nodeRef = useRef<HTMLDivElement>(null); // 容器div的引用，用于检查可见性

    useEffect(() => {
        const node = numberRef.current;
        const containerNode = nodeRef.current;

        if (node && containerNode) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting && !hasAnimated.current) {
                            hasAnimated.current = true; // 标记为已动画
                            animate(0, targetNumber, {
                                duration: duration,
                                ease: "easeOut",
                                onUpdate(value: number) {
                                    // 确保动画帧期间节点仍然存在
                                    if(numberRef.current) {
                                        numberRef.current.textContent = Math.round(value).toString();
                                    }
                                },
                            });
                        }
                    });
                },
                {
                    threshold: 0.3, // 当30%可见时触发
                }
            );

            observer.observe(containerNode);

            // 组件卸载时清理observer
            return () => {
                if (containerNode) {
                    observer.unobserve(containerNode);
                }
            };
        }
    }, [targetNumber, duration]); // 依赖项

    return (
        <div className={className} ref={nodeRef}> {/* 将ref附加到容器 */}
            {/* 初始化显示为0 */}
            <span ref={numberRef}>0</span>
            {suffixElement}
        </div>
    );
};

export default AnimatedNumber; 