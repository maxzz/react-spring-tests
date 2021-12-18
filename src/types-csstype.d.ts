import * as CSS from 'csstype';

type CSSCustProp<Str extends string> = `--${Str}`;

declare module 'csstype' {
  interface Properties {

    // CSSCustProp<string>: any;
    [key: CSSCustProp<string>]: any;
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
