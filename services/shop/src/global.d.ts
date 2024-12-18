declare module '*.module.scss' {
    interface IClassesNames {
        [className: string]: string
    }
    const classNames: IClassesNames
    export = classNames
}

declare module "*.svg" {
    import React from "react";
    const SVG: React.FC<React.SVGProps<SVGSVGElement>>;
    export default SVG;
}

declare module "*.png";
declare module "*.jpeg";
declare module "*.jpg";

declare const __PLATFORM__: "desktop" | 'mobile';