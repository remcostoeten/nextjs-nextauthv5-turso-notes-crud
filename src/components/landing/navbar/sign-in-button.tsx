const DEFAULT_COLOR = 'rgb(252,202,68)'

type SignUpButtonProps = {
    color?: string
}

export default function SignUpButton({
    color = DEFAULT_COLOR,
}: SignUpButtonProps) {
    return (
        <a
            href="/sign-up"
            rel="noopener"
            className="text-black text-[14px] px-[16px] py-[8px] rounded-[32px] no-underline"
            style={{ backgroundColor: color }}
        >
            Sign Up
        </a>
    )
}
