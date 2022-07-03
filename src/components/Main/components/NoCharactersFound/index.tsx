interface NoCharactersFoundProps {
    message: string
}

export function NoCharactersFound({ message }: NoCharactersFoundProps) {
    return(
        <section
         className="
            w-full flex flex-col text-xl text-justify
            text-brand-gray-600
            dark:text-brand-gray-300
         "
        >
            <strong>
                {message}
            </strong>
        </section>
    )
}