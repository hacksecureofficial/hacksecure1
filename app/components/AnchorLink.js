// components/AnchorLink.js
const AnchorLink = ({ href, children, className, icon, testId }) => {
    return (
      <a href={href} className={className} data-testid={testId}>
        {icon && <i className={`icon-${icon}`} />}
        {children}
      </a>
    );
  };
  
  export default AnchorLink;
  