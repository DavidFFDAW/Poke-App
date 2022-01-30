export const Arrow = ({ trigger, level }) => {
    return (
        <div className="fixed-width flex center">
            <span className="trigger">{trigger} { level ? level : '' }</span>
        </div>
    );
}