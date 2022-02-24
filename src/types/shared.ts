export type InputProps = svelteHTML.HTMLProps<HTMLInputElement> & {
  kind: 'regular' | 'select';
  containerProps?: Omit<svelte.JSX.HTMLAttributes<HTMLSpanElement>, 'height' | 'width'> &
    StackProps;
  selectOptions?: {
    text: string;
    value: string | number | boolean;
    icon?: SVGIconName;
    action?(): void;
  }[];
};

export type IconButtonProps = Omit<svelteHTML.HTMLProps<HTMLButtonElement>, 'size'> & {
  size?: 'small' | 'medium' | 'large';
  variant?: 'icon' | 'contained' | 'outlined';
  // color?: 'primary' | 'secondary' | 'tertiary';
  icon: SVGIconName;
};

export interface SVGIconProps {
  name: SVGIconName;
  size?: string | number;
  color?: string;
}

export type SVGIconName = 'search' | 'caret';

export interface StackProps extends Omit<svelteHTML.HTMLProps<HTMLElement>, 'rows'> {
  gap?: string;
  columnGap?: string;
  rowGap?: string;
  //column: string ;
  columns?: string;
  //row: string ;
  rows?: string;
  height?: string;
  width?: string;
  as?:
    | 'form'
    | 'label'
    | 'nav'
    | 'header'
    | 'main'
    | 'aside'
    | 'footer'
    | 'div'
    | 'span'
    | 'p'
    | 'ul'
    | 'ol'
    | 'li'
    | 'section';
}

export interface TextProps extends svelteHTML.HTMLProps<HTMLElement> {
  as?:
    | 'em'
    | 'strong'
    | 'address'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'span'
    | 'div'
    | 'p'
    | 'i'
    | 'small'
    | 'blockquote';
}

export type ViewAs = StackProps['as'] & TextProps['as'] & 'br';
