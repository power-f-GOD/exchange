export type InputProps = svelteHTML.HTMLProps<HTMLInputElement> & {
  kind: 'regular' | 'select';
  containerProps?: Omit<svelte.JSX.HTMLAttributes<HTMLSpanElement>, 'height' | 'width'> &
    StackProps;
  isLoading?: boolean;
  selectOptions?: Array<{
    text: string;
    value: string | number | boolean | Record<string, any>;
    iconName?: SVGIconName;
    icon?: string;
    action?(): void;
  }>;
};

export type IconButtonProps = Omit<svelteHTML.HTMLProps<HTMLButtonElement>, 'size'> & {
  size?: 'small' | 'medium' | 'large';
  variant?: 'icon' | 'contained' | 'outlined';
  // color?: 'primary' | 'secondary' | 'tertiary';
  icon: SVGIconName;
  iconProps: Omit<SVGIconProps, 'name'>;
};

export interface SVGIconProps extends Omit<svelteHTML.HTMLProps<HTMLElement>, 'size'> {
  name: SVGIconName;
  size?: string | number;
  color?: string;
}

export type SVGIconName = 'search' | 'caret' | 'spinner';

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
  fontSize?: string;
  color?: string;
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

// export type ViewAs = StackProps['as'] & TextProps['as'] & 'br';
