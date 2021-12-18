import * as CSS from 'csstype';

type CSSCustomProperty<Str extends string = string> = `--${Str}`;

declare module 'csstype' {
  interface Properties {

    [key: CSSCustomProperty]: any;
    '--top'?: number;
    '--left'?: number;
    '--width'?: number;
    '--height'?: number;

    /*
    // Add a missing property
    WebkitRocketLauncher?: string;

    // Add a CSS Custom Property
    '--theme-color'?: 'black' | 'white';

    // ...or allow any other property
    [index: string]: any;
    */
  }
}
