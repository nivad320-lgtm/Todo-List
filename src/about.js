import supinatedImage from './supinated.jpg'
import hammerImage from './hammer.png'

const DisplayController = {
    buildText(text, element) {
        const title = document.createElement(element);
        title.textContent = text;
        return title;
    },

    buildImg(src, altText) {
        const img = document.createElement('img');
        img.src = src;
        img.alt = altText;
        return img
    },

    buildList(listArray, list) {
        listArray.forEach((item) => {
            let li = document.createElement('li');
            li.textContent = item;
            list.appendChild(li);
        })
    },

    loadHome() {
        const contentContainer = document.querySelector('#content');

        // build lego blocks
        const title = this.buildText('This is a new tab', 'h1');
        
        const supinated = this.buildImg(supinatedImage, 'supinated-curl');
        const hammer = this.buildImg(hammerImage, 'hammer-curl')

        const para = this.buildText('The core difference comes down to wrist position, which shifts the mechanical load to entirely different muscles in your arms.', 'p')
        const supinatedTitle = this.buildText('Supinated Curl', 'h2');
        
        const supinatedList = document.createElement('ul');
        
        const supinatedListContent = ['The Grip: Your palms face completely upward (supinated) throughout the movement, or rotate to face upward at the top.',
            'Primary Target: The biceps brachii (the main two-headed bicep muscle that forms the classic "peak").',
            `Why it works: Your biceps don't just flex your elbow; they are also the primary muscle responsible for supinating (rotating) your forearm. By keeping your palms up, you force the biceps into their strongest anatomical contraction.`];
            
        this.buildList(supinatedListContent, supinatedList);
            
        const hammerTitle = this.buildText('Hammer Curl', 'h2')
        const hammerList = document.createElement('ul');
        const hammerListContent = [
            `The Grip: Your palms face each other (neutral grip) as if you are holding a hammer.`,
            `Primary Target: The brachialis and the brachioradialis.`,
            `Why it works: Turning your palms inward mechanically disadvantages the biceps brachii, forcing these lower arm and deep elbow flexors to do the heavy lifting.`
        ]
        this.buildList(hammerListContent, hammerList);
        const inlineList = document.createElement('ul');
        const inlineListContent = [
            `Brachialis: A deep muscle that sits underneath your lower bicep. When grown, it physically pushes your bicep upward, making your arm look thicker from the side.`,
            `Brachioradialis: The thick muscle on the top/thumb-side of your forearm.`,
        ]

        hammerList.querySelectorAll('li')[2].appendChild(inlineList);
        this.buildList(inlineListContent, inlineList);

        const finalThought = this.buildText('Which should you do?', 'h2');
        const finalThoughAns = this.buildText(`Do both. They aren't mutually exclusive.`, 'p');
        contentContainer.append(
            title, 
            supinated, 
            hammer, 
            para,
            supinatedTitle,
            supinatedList,
            hammerTitle,
            hammerList,
            finalThought,
            finalThoughAns

        )


    },
}

export default DisplayController;