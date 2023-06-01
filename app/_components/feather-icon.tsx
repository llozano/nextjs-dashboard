export const FeatherIcon = ({ name, className } : {
  name: string,
  className?: string
}) => {
  return (
    <>
      <svg className={`feather ${className || ''}`}>
        <use href={`feather-sprite.svg#${name}`} />
      </svg>
    </>
  );
};
