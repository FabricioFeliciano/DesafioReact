"use client";
import { useSelector } from "react-redux";

export default function Relatorio() {

    const { pessoas } = useSelector((state: any) => state.pes);

    const generos = ["Ação", "Terror", "Suspense", "Aventura", "Herói"];

    const calcGenero = (genero: string) => {

        var q = pessoas.filter((p: any) => p.Genero.includes(genero)).length;

        return <h2>{genero}: {q} <small className="text-link"> ({((q / pessoas.length || 0) * 100).toFixed(2)}%)</small></h2>
    }

    return (
        <main>
            <h1>Relatório</h1>
            <hr />
            {generos.map(g => calcGenero(g))}
        </main>
    )
}