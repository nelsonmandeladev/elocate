import { Children, ReactNode } from "react";

type EachRendererProps<T> = {
    render: (item: T, index: number) => JSX.Element,
    of: T[]
}

export const EachRenderer = <T,>({ render, of }: EachRendererProps<T>): ReactNode => Children.toArray(of.map((item: T, index: number) => render(item, index)));
