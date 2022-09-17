// 文件路径src/components/Button/button.tsc

import React, { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes, FC } from 'react';
// 类名合并的小工具，安装命令是： npm install classnames @types/classnames --save
import classnames from 'classnames'; 

// 定义按钮的类型和大小
export type ButtonType = 'primary' | 'default' | 'danger' | 'link' | 'dash'
export type Size = 'lg' | 'md' | 'lg'

// 用interface定义按钮props类型约束
interface baseBtnType {
    children?: ReactNode,
    className?: string,
    btnType?: ButtonType,
    size?: Size
}

// 定义两种联合类型，一种是button型的，一种是a标签型的按钮
type NativeButtonProps = baseBtnType & ButtonHTMLAttributes<HTMLElement> // 基础按钮类型，props类型定义
type AnchorButtonProps = baseBtnType & AnchorHTMLAttributes<HTMLElement> // a标签类型的按钮，props类型定义

// 用Partial组合两种类型
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps> // 按钮最终的prop类型定义

// 使用泛型定义函数的入参及返回值类型
export const Button: FC<ButtonProps> = (props) => {
    let {
        className,
        children,
        btnType,
        size,
        ...restProps
    } = props

    // 类名合并工具classnames
    const finalClassName = classnames('dd-btn', className, {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
    })

    return (
        <button
            className={finalClassName}
            {...restProps}
        >
            {
                children
            }
        </button>
    )
}

Button.defaultProps = {
    disabled: false,
    btnType: 'primary',
    size: 'md'
}

export default Button