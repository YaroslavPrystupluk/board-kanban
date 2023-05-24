import { FC } from "react";
import { Breadcrumb } from "react-bootstrap";

import { StyledBreadcrumb, Separator } from "./styledBreadcrumbs";
import "bootstrap/dist/css/bootstrap.min.css";

interface BreadcrumbsProps {
  owner: string;
  repo: string;
  repositoryUrl: string;
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ owner, repo, repositoryUrl }) => {
  return (
    <StyledBreadcrumb className="mt-3" style={{ textTransform: "capitalize" }}>
      <Breadcrumb.Item href={`https://github.com/${owner}`} target="_blanck">
        {owner}
      </Breadcrumb.Item>
      {repositoryUrl.length > 0 && <Separator>{">"}</Separator>}
      <Breadcrumb.Item
        href={`https://github.com/${owner}/${repo}`}
        target="_blanck"
      >
        {repo}
      </Breadcrumb.Item>
    </StyledBreadcrumb>
  );
};

export default Breadcrumbs;
