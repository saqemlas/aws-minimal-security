export interface AWSIPS {
    syncToken: string;
    createDate: string;
    prefixes: PREFIX[];
};

export interface PREFIX {
    ip_prefix: string;
    region: string;
    service: string;
    network_border_group: string;
};
