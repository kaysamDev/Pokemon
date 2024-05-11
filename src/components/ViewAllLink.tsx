import { Link } from "react-router-dom";

export default function ViewAllLink() {
  return (
    <>
      <Link to="/#/list-view" className="underline text-lg font-medium">
        View all
      </Link>
    </>
  );
}
