import React from 'react';

export interface IBreadcrumbItem {
  label: string;
  href?: string;
}

export interface IBreadcrumbProps {
  items: IBreadcrumbItem[];
}

export const Breadcrumb: React.FC<IBreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex text-sm text-[#6B6B6B]">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        {items.map((item, idx) => (
          <li key={idx} className="inline-flex items-center">
            {idx > 0 && <span className="mx-1 text-neutral-400">/</span>}
            {item.href ? (
              <a href={item.href} className="hover:text-[#FF1493] transition-colors">
                {item.label}
              </a>
            ) : (
              <span className="text-neutral-900 font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
