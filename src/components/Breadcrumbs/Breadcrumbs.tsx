import { FC } from "react";
import { Breadcrumb } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

interface BreadcrumbsProps {
  owner: string;
  repo: string;
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ owner, repo }) => {
  return (
    <Breadcrumb className="mt-3" style={{ textTransform: "capitalize" }}>
      <Breadcrumb.Item href={`https://github.com/${owner}`} target="_blanck">
        {owner}
      </Breadcrumb.Item>
      <Breadcrumb.Item
        href={`https://github.com/${owner}/${repo}`}
        target="_blanck"
      >
        {repo}
      </Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
