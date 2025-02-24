// PageLink.js
import Link from 'next/link';

const PageLink = ({ href, children, className, testId }) => {
  return (
    <Link href={href}>
      <a className={className} data-testid={testId}>
        {children}
      </a>
    </Link>
  );
};

export default PageLink;
