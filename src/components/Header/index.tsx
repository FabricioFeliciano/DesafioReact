'use client';

import './index.scss';

//Componentes
import IconLink from '../Elements/IconLink';

export default function Header() {


    return <header >
        <div className='flex justify-between'>
            <div className='flex align-center gap-10' >
                <h1>Desafio</h1>
            </div>

            <div className='flex align-center gap-10' >
                <IconLink icon='icon icon-envelope' tooltip={{ content: 'E-mail', position: 'right' }} onClick={() => { window.location.href = 'mailto:fabricio@fffs.com.br'; }} />
                <IconLink icon='icon icon-whatsapp' tooltip={{ content: 'WhatsApp', position: 'right' }} onClick={() => { window.open('https://api.whatsapp.com/send?phone=5521997999959&text=Adoramos%20o%20que%20você%20fez!%20Queremos%20seu%20talento%20no%20nosso%20time.', '_blank', 'noopener,noreferrer'); }} />
            </div>
        </div>
    </header>
}