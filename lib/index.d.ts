declare const Command: any;
declare const vs: any;
declare const path: any;
declare const program: any;
interface ACTIONSMAP {
    [propName: string | symbol]: {
        alias: string;
        description: string;
        examples: string[];
    };
}
declare const mapActions: ACTIONSMAP;
declare const helpText: () => void;
declare const args: string[];
