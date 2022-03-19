// This file is for declaring modules which do not have type declaration files
declare module "react-rewards";

declare module "*.mp3" {
    const value: any;
    export default value;
}

declare module '*.svg?inline' {
    const content: any
    export default content
}

declare module '*.svg' {
    const content: any
    export default content
}