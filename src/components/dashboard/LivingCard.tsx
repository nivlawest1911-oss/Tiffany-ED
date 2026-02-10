'use client';

import EdIntelNode from '../sovereign/layout/EdIntelNode';

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
    <EdIntelNode
        title={title}
        videoSrc={videoUrl}
        actionText={actionText}
        onAction={onAction}
        delay={delay}
    >
        {children}
    </EdIntelNode>
);
