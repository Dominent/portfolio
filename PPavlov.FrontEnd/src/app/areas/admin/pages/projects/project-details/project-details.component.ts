import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ProjectDetail } from 'src/app/models/project-detail.model';
import { AppState } from 'src/app/store/app.state';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Link } from 'src/app/models/link.model';
import { Image } from 'src/app/models/image.model';
import { selectProjectDetails } from 'src/app/store/selectors/project.selector';
import { fetchProjectDetailsAction, cleanProjectDetailsAction } from 'src/app/store/actions/project.actions';
import { ProjectDetailsAddDialogComponent } from '../../../components/project/project-details/project-details-add/project-details-add.component';

@Component({
    templateUrl: 'project-details.component.html',
    styleUrls: ['project-details.component.scss']
})
export class ProjectDetailsComponent {
    private projectId: number;

    public displayedColumns: string[] = ['id', 'name', 'href', 'edit', 'delete']

    constructor(
        private dialog: MatDialog,
        private store: Store<AppState>,
        private route: ActivatedRoute
    ) {
        this.store.dispatch(cleanProjectDetailsAction());
        
        this.route.params.subscribe(x => {
            this.projectId = +x['id'];

            this.store.dispatch(fetchProjectDetailsAction({ projectId: this.projectId }));
        });
    }

    public addProjectDetails() {
        this.dialog.open(ProjectDetailsAddDialogComponent, {
            width: '1000px',
            data: { projectId: this.projectId }
        })
    }

    public get projectDetail(): Observable<ProjectDetail> {
        return this.store.pipe(select(selectProjectDetails, { projectId: this.projectId }))
    }

    public get projectLinks(): Observable<Link[]> {
        return this.projectDetail.pipe(map(x => x.links))
    }

    public get projectImages(): Observable<Image[]> {
        return this.projectDetail.pipe(map(x => x.images))
    }

    public deleteLinkHandler(link: Link) {

    }

    public editLinkHandler(link: Link) {

    }

    public editGeneralInfoHandler() {

    }

    public addTagHandler() {

    }

    public addLinkHandler() {

    }

    public addImageHandler() {

    }
}