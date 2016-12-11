import { ViewInstanceJSON } from 'plotter-shell-model/dist/lib';
export interface ITab {
    title: string;
    header?: ViewInstanceJSON;
    tabs: ITab[];
}
