import logoImage from "@/assets/logo.png";

type Props = { className?: string };

/**
 * Shared Task-Fix brand image used across the app.
 */
export function LogoMark({ className }: Props) {
  return (
    <img
      src={logoImage}
      alt="Task-Fix"
      className={className}
      draggable={false}
      loading="eager"
    />
  );
}
