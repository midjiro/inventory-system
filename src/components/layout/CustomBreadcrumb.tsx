import type React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from '../ui/breadcrumb';

export type BreadcrumbLinkItem = {
  path: string;
  label: string;
};

type Props = {
  links: BreadcrumbLinkItem[];
};

const BreadcrumbSegment: React.FC<{
  link: BreadcrumbLinkItem;
  isLast: boolean;
}> = ({ link, isLast }) => {
  if (isLast)
    return (
      <BreadcrumbItem>
        <span>{link.label}</span>
      </BreadcrumbItem>
    );

  return (
    <BreadcrumbItem>
      <BreadcrumbLink asChild>
        <Link to={link.path} className="flex items-center gap-1">
          <span>{link.label}</span>
          <ChevronRight />
        </Link>
      </BreadcrumbLink>
    </BreadcrumbItem>
  );
};

export const CustomBreadcrumb: React.FC<Props> = ({ links }) => {
  if (!links || links.length === 0) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {links.map((link, index) => (
          <BreadcrumbSegment
            key={link.label}
            link={link}
            isLast={index === links.length - 1}
          />
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
