import {
    toast
} from "sonner";

export const errorToast = ({
    title,
    description
}: {
    title?: string;
    description: string;
}) => {
    return toast(title ?? "Something went wrong, please try again later", {
        ...(description && {description: ""}),
    });
};

export const successToast = ({
    title,
}: {
    title?: string;
}) => {
    return toast.success(title ?? "Success", {
        duration: 5000
    });
};