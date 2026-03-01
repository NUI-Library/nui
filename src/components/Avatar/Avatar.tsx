"use client";
import React, { useState } from "react";
import type { AvatarProps } from "./types";
import { avatarStyles } from "./styles";
import { useStyles } from "../../styles/use-styles";

function getInitials(name: string): string {
  return name.split(" ").map(p => p[0]).join("").slice(0, 2).toUpperCase();
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  function Avatar({ src, alt, name, size = "md", radius = "full", color = "primary", children, ...rest }, ref) {
    const [imgError, setImgError] = useState(false);
    const styles = useStyles({ name: "Avatar", stylesFn: avatarStyles, props: { size, radius, color } });

    const showImage = src && !imgError;
    const fallback = children || (name ? getInitials(name) : "?");

    return (
      <div ref={ref} style={styles.root} {...rest}>
        {showImage ? <img src={src} alt={alt || name || ""} style={styles.image} onError={() => setImgError(true)} /> : fallback}
      </div>
    );
  }
);
Avatar.displayName = "NUI.Avatar";
