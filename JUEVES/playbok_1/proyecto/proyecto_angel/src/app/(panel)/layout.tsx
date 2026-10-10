import { Toaster } from '@/components/ui';
import { DeshboardLayout } from '@/layouts';

export default function panelLayout({ children }: { children: React.ReactNode }) {
    return (
        <DeshboardLayout>
            {children}
            <Toaster />
        </DeshboardLayout>
    )
}
