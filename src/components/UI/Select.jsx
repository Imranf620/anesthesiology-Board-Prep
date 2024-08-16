const Select = ({children, className='', ...props}) => {
    return <select className={`outline-none border-2 border-gray-300 focus:border-primary-400 rounded-md ${className}`} {...props}>{children}</select>
}

export default Select