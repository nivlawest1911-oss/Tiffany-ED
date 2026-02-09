'use client';

import SovereignNode from '../layout/SovereignNode';

interface LivingCardProps {
    videoUrl: string;
    title: string;
    children: React.ReactNode;
    actionText?: string;
    onAction?: () => void;
    delay?: number;
}

export const LivingCard = ({
    videoUrl,
    title,
    children,
    actionText = "VIEW DETAILS",
    onAction,
    delay = 0
}: LivingCardProps) => (
    <SovereignNode
        title={title}
        videoSrc={videoUrl}
        actionText={actionText}
        onAction={onAction}
        delay={delay}
    >
        {children}
    </SovereignNode>
);
