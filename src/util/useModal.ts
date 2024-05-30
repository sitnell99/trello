'use client';

import {
    ChangeEvent,
    Dispatch, LegacyRef,
    RefObject,
    SetStateAction,
    useCallback,
    useEffect,
    useRef,
    useState
} from "react";

export const useModal = () => {

    const modalRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const [showModal, setShowModal] = useState<boolean>(false);

    type Target = {
        keyCode: number
    }

    const closeOnEsc = useCallback( (target: Target) => {
        if (target.keyCode === 27) {
            setShowModal(false);
        }
    }, [])

    const toggleModal = (): void => setShowModal(!showModal);

    const useEventListener = (type: string, listener: ChangeEvent<HTMLInputElement>): void => {
        useEffect(() => {
            //@ts-ignore
            document.addEventListener(type, listener);

            return () => {
                // @ts-ignore
                document.removeEventListener(type, listener);
            };
        }, [listener, type]);
    };
    type InsideTarget = {
        target: Node
    }
    const tabIndexHandler = useCallback(({ target }: InsideTarget) => {

        const isOutsideElement = !modalRef.current || !modalRef.current.contains(target);
        const isOutsideTrigger = !triggerRef.current || !triggerRef.current.contains(target);

        if (isOutsideElement && isOutsideTrigger) {
            setShowModal(false);
        }

    }, []);

    //@ts-ignore
    useEventListener('keyup', closeOnEsc)
    //@ts-ignore
    useEventListener('mousedown', tabIndexHandler)

    type ModalHookPropsType = {
        toggleModal: () => void,
        setShowModal: Dispatch<SetStateAction<boolean>>,
        showModal: boolean,
        modalRef: LegacyRef<HTMLDivElement> | null,
        triggerRef: RefObject<HTMLButtonElement> | null
    }

    const ModalHookProps: ModalHookPropsType = {
        setShowModal,
        showModal,
        modalRef,
        triggerRef,
        toggleModal
    }

    return ModalHookProps;
}


