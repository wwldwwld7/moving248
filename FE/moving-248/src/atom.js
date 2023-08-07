import { atom } from 'recoil';

export const memberNameAtom = atom({
    key: 'atom_name',
    default: '',
});

export const memberEmailAtom = atom({
    key: 'atom_email',
    default: '',
});

export const memberTypeAtom = atom({
    key: 'atom_type',
    default: '',
});

export const memberIdAtom = atom({
    key: 'atom_id',
    default: '',
});

export const memberActiveApply = atom({
    key: 'atom_apply',
    default: '',
});
