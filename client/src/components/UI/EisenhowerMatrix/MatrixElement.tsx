import type { MatrixCardElementProps } from "../../../utils/types/matrix";

export const MatrixElement = ({ id, title }: MatrixCardElementProps) => {
    return (
        <p
            key={id}
            className="
                bg-white/40
                backdrop-blur-md
                border border-white/10
                text-sm 
                p-1
                shadow-sm         /* лёгкая тень для объёма */
            "
        >
            {title}
        </p>
    );
}
