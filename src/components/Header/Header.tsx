import igniteLogo from "../../assets/logo.svg"
import { AiOutlinePlusCircle } from 'react-icons/ai';

import styles from './Header.module.css';
import { ChangeEvent, FormEvent, useState } from "react";

interface Props{
    // Tipando a função com param. que ela recebe + o retorno (nada)
    onAddTask: (taskTitle: string) => void;
}

export function Header({ onAddTask }: Props){

    const [title, setTitle] = useState("")

    function handleSubmit(event: FormEvent){
        event.preventDefault();

        // Adicionando com o que foi alimentado no setTitle
        onAddTask(title);

        // Limpando input após adicionar
        setTitle('');
    }


    function onChangeTitle(event: ChangeEvent<HTMLInputElement>){
        // Atualizando o valor de title no onchange dele
        setTitle(event.target.value);
    }   

    return(
        <header className={styles.header}>
            <img src={igniteLogo} />

            <form className={styles.newTaskForm} onSubmit={handleSubmit}>
                <input
                    type="text" 
                    placeholder="Adicione uma nova tarefa"
                    onChange={onChangeTitle}
                    value={title}
                />
                <button>Criar
                    <AiOutlinePlusCircle 
                        size={20}
                    />
                </button>
            </form>
        </header>
    );
}