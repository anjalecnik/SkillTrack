interface FlagIconProps {
  countryCode: string;
  width?: string;
  lazyLoad?: boolean;
}

export const FlagIcon = ({
  countryCode,
  width = "20px",
  lazyLoad,
}: FlagIconProps) => {
  return (
    <img
      loading={lazyLoad ? "lazy" : undefined}
      width={width}
      src={`https://flagcdn.com/w20/${countryCode.toLowerCase()}.png`}
      srcSet={`https://flagcdn.com/w40/${countryCode.toLowerCase()}.png 2x`}
      alt="country flag"
    />
  );
};
