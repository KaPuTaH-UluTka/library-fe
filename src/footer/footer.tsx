import React from 'react';

import facebookIcon from '../assets/footer-icons/Icon_facebook.svg'
import instagramIcon from '../assets/footer-icons/Icon_inst.svg'
import linkedinIcon from '../assets/footer-icons/Icon_link.svg'
import vkIcon from '../assets/footer-icons/Icon_vk.svg'

import classes from './footer.module.scss'

export const Footer = () => {
    const socials = [{id:1, icon: facebookIcon, alt: 'facebook'}, {id:2, icon: instagramIcon, alt: 'instagram'}, {id:3, icon: vkIcon, alt: 'vk'}, {id:4, icon: linkedinIcon, alt: 'linkedin'}];

    return (
        <footer className={classes.footer}>
            <div className={classes['footer-bar']}>
                <p className={classes['footer-title']}>© 2020-2023 Cleverland. Все права защищены.</p>
                <div className={classes['footer-socials']}>
                    {socials.map((el) => <img className={classes['footer-socials-item']} src={el.icon} alt={el.alt} key={el.id}/>)}
                    </div>
            </div>
        </footer>
    );
};
