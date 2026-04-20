function Header({ progress, stage }) {
  stage = stage || "Developer profile";
  return (
    <header className="flex items-center justify-between min-w-md p-4">
      <h3 className="text-lg font-medium text-text-disabled text-center">
        Stage: {stage}
      </h3>
      <div>
        <p className="text-sm text-center text-text-medium mt-1">
          Progress: {progress}%
        </p>
      </div>
    </header>
  );
}

export default Header;
